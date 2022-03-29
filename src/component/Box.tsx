import Link from "next/link";

import { BoxProps } from "../types/this";

export default (props: BoxProps) => {
    return (
        <Link href={props.href}>
            <div className="box">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>        
        </Link>
        )
}