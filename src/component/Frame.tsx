import Head from 'next/head'
import Link from 'next/link'

export type FrameProps = {
    title?: string,
    pageTitle: string,
    back: boolean,
    children?: JSX.Element
}

export default (props: FrameProps) => {
    return (
        <>
            <Head>
                <title>NextJs Test Plataform { (props.title) ? `| ${props.title}` : ''}</title>
            </Head>

            {props.pageTitle ? (<h1>{props.pageTitle}</h1>) : '' }
            {props.back ? (<Link href='/'><a  className="backBtn">Back</a></Link>) : '' }

        {props.children}

            <div className="footer">
                <a href="mailto:seufetelli@gmail.com">I<span style={{fontSize: '130%'}}>)(</span>I Developer</a>
            </div>
        </>
    )
}