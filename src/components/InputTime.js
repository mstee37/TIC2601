export default function InputTime({ label, value, setValue }) {
    return (
        <input
            type={"time"}
            required={true}
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}
        />
    )
};