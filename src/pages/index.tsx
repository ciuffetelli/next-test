import Head from "next/head"
import Box from "../component/Box"

import Frame from "../component/Frame"

import Projects from "../projects.json"

export default () => {
    return (
        <Frame pageTitle="NextJs Test Plataform" back={false}>
            <>
            {Projects.map( (project, index) => {
                return (
                    <Box key={`Box_${index}`} href={project.href} title={project.title} description={project.description} />
                )
            })}
            </>
        </Frame>
    )
}