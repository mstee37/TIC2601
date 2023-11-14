export default function RankingCourse({value, setValue}) {
    return (
        <select
            value={value}
            onChange={(event) => {            
                setValue(event.target.value);
            }}
            onClick={(event) => {                
                setValue(event.target.value);
            }}
        >
            <option value={"1"}>1</option>
            <option value={"2"}>2</option>
            <option value={"3"}>3</option>
            <option value={"4"}>4</option>
            <option value={"5"}>5</option>
        </select>
    )
};