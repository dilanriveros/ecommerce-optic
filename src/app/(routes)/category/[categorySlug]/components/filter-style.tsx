import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "../../../../../../types/filters";

type  filterStyleProps  = {
  setFilterStyle: (style: string) => void
}
const FilterStyle = (props: filterStyleProps) => {
    const {setFilterStyle} = props;
    const { result, loading }:FilterTypes = useGetProductField()

    return (
      <div className="my-5">
        <p className="mb-3 font-bold">Estilo</p>
        {loading && result === null && (
        <p>Cargando estilo ... </p>
      )}

      <RadioGroup onValueChange={(value) => setFilterStyle(value)}>
        {result != null && result?.schema?.attributes?.style?.enum?.map((style: string) => (
          <div key={style} className="flex items-center space-x-2">
              <RadioGroupItem value={style} id={style}/>
              <Label htmlFor={style}>{style}</Label>
             </div>
        ))}   
        </RadioGroup>
        </div>
        );
       }

export default FilterStyle;