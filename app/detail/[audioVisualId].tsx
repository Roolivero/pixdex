import DetailScreen from "@/src/screens/detail/DetailScreen";
import { useLocalSearchParams } from "expo-router";

type DetailRouteParams = {
    audioVisualId: string
}

export default function DetailRoute(){
    const {audioVisualId} = useLocalSearchParams<DetailRouteParams>();
    return <DetailScreen audioVisualId={audioVisualId}/>
}