import Link from "next/link";

export default (props) => {
    return (
        <Link href={props.href}>
            <div className="box">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>        
        </Link>
        )
}