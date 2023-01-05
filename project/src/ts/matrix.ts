type Row<T> = Array<T>
type Column<T> = Array<T>

class Matrix extends Array<Row<number>> implements Column<Row<number>> {


}