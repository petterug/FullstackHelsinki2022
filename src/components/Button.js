
const Button = (props) => {

    return (
        <button onClick={() => props.onClick(props.person)}>
        {props.text}
        </button>
    )
}

export default Button