import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { map } from "rxjs/operators";
import { InMemoryFile } from "../models/inmemory-file.model";
import { ElectronService } from "../services/electron/electron.service";

@Injectable({ providedIn: "root" })
export class DataInMemory<TD extends { id: number }> {
  private data: ReplaySubject<TD[]> = new ReplaySubject<TD[]>(1);
  private version: string;
  private sequence: number;
  private currentData: TD[];

  constructor(private electronService: ElectronService) {
    this.load();
  }

  public load(path?: string): void {
    if (!this.electronService.isElectron) {
      return;
    }
    ({
      version: this.version,
      data: this.currentData,
      sequence: this.sequence,
    } = JSON.parse(
      this.electronService.fs.readFileSync(path, "utf8")
    ) as InMemoryFile<TD>);
    this.data.next(this.currentData);
  }

  public save(path?: string): void {
    if (!this.electronService.isElectron) {
      return;
    }
    this.electronService.fs.writeFileSync(
      path,
      JSON.stringify({
        version: this.version,
        sequence: this.sequence,
        recipes: this.currentData,
      })
    );
  }

  public get(): Observable<TD[]> {
    return this.data.asObservable();
  }

  public getById(id: number): Observable<TD> {
    return this.data
      .asObservable()
      .pipe(map((data: TD[]) => data.find((i) => i.id === id)));
  }

  public post(item: Omit<TD, "id">): void {
    this.currentData = [
      ...this.currentData,
      {
        ...item,
        id: this.sequence,
      } as TD,
    ];
    this.sequence++;
    this.data.next(this.currentData);
  }

  public delete(id: number): void {
    this.currentData = this.currentData.filter((i) => i.id !== id);
    this.data.next(this.currentData);
  }

  public patch(id: number, recipe: Partial<TD>): void {
    this.currentData = this.currentData.map((i) =>
      i.id === id ? { ...i, ...recipe, id } : i
    );
    this.data.next(this.currentData);
  }

  public count(): Observable<number> {
    return this.data
      .asObservable()
      .pipe(map((recipes: TD[]) => recipes.length));
  }
}
