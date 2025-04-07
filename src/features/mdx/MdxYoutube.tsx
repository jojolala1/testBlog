import { YouTubeEmbed } from "@next/third-parties/google"

export const MdxYoutube = ({id}: {id:string})=>{
    return <YouTubeEmbed videoid={id}/>
}