export default function DropdownCourse({value, setValue}) {
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
            <option value={"Business Analytics"}>Business Analytics</option>
            <option value={"Software Engineering"}>Software Engineering</option>
            <option value={"Cybersecurity"}>Cybersecurity</option>
            <option value={"Business Administration"}>Business Administration</option>
            <option value={"Economics"}>Economics</option>
            <option value={"Banking & Finance"}>Banking & Finance</option>
        </select>
    )
};