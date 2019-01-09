export class GraphData {
    private months: string[] = [ 'january', 'february', 'march', 'april', 'may', 'june', 'july'];
    private values: number[] = [ 1, 2, 3, 4, 5, 6, 7 ];
    public label: string = "Sales";

    constructor(){

    }

    getData(){
        return [
            { data: this.values, label: this.label }
        ];
    }

    incrementValue( month: string, value: number ) {
        month = month.toLowerCase().trim();
        for ( let i in this.months ){
            if( this.months[i] === month ){
                this.values[i] += value;
            }
        }
        return this.getData();
    }
}