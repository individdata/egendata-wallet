import Router from "next/router";

const Request = () => {
    const { id } = Router.query;
    return (
        <p>{ id }</p>
    );
}

export default Request;