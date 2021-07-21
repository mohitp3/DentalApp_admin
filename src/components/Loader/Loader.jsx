import React from 'react'
import LoadingOverlay from "react-loading-overlay";
import BeatLoader from "react-spinners/BeatLoader";

const Loader = (loading) => {
    return (
        <LoadingOverlay
        active={true}
        spinner={<BeatLoader color="#FFA500" size={30} />}
        text=""
        color="#ffffff"
      >

      </LoadingOverlay>
    )
}

export default Loader
