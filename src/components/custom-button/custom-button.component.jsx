import './custom-buttom.styles.css'

const CustomButton = ({ title ,...otherProps}) => (
    <button 
        className='custom-button'
        {...otherProps}
        >
            {title}
    </button>
)

export default CustomButton