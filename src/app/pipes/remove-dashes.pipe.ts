import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "removeDashes",
    standalone: true,
    pure: true,
    
})

export  class RemovedashesPipe implements PipeTransform {
    transform (value: string)   : string {
        if (!value) return '';
        return value.replace(/-/g, '');
    }
}