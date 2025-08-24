import Banner from '../components/banner';

function Error(){
    const data = {
        title: "404 - Not found",
        content: "The page you are looking for cannot be found",
        destination: "/",
        label: "Back home"
    }

    return (
        <Banner data={data}/>
    )
}

export default Error;