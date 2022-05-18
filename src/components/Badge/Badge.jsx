import './Badge.scss'

const Badge = ({ color, activeClassName }) => {
    return (
        <div className={`badge badge--${color} ${activeClassName}`}>
            
        </div>
    );
}

export default Badge;
