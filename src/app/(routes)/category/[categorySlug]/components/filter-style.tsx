import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type FilterStyleProps = {
  setFilterStyle: (style: string) => void;
};

const FilterStyle = ({ setFilterStyle }: FilterStyleProps) => {
  // Estilos fijos
  const styles = ["Hombre", "Mujer", "Niños"];

  return (
    <div className="my-5">
      <p className="mb-3 font-bold">Estilo</p>

      <RadioGroup onValueChange={(value) => setFilterStyle(value)}>
        {styles.map((style) => (
          <div key={style} className="flex items-center space-x-2">
            <RadioGroupItem value={style} id={style} />
            <Label htmlFor={style}>{style}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterStyle;
