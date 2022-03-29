import Box from "../component/Box"

import Projects from "../projects.json"

export default () => {
    return (
        <>
            <h1>
                NextJs Test Plataform
            </h1>

            {Projects.map( (project, index) => {
                return (
                    <Box key={`Box_${index}`} href={project.href} title={project.title} description={project.description} />
                )
            })}

            <div className="footer">
                <a href="mailto:seufetelli@gmail.com">I<span style={{fontSize: '130%'}}>)(</span>I Developer</a>
            </div>
        </>
    )
}