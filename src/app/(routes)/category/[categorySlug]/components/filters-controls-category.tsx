import FilterStyle from "./filter-style";
type FiltersControlsCategoryProps = {
    setFilterStyle  : (style: string) => void
}

const FiltersControlsCategory = (props: FiltersControlsCategoryProps) => {
    const {setFilterStyle} = props
    return(
        <div className="sm:w-[350px] sm:mt-5 p-6">
            <FilterStyle setFilterStyle={setFilterStyle} />

        </div>
    );
}
export default FiltersControlsCategory;