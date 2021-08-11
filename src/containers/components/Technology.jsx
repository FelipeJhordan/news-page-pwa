import React, {memo} from  "react";
import { Column, Row } from "../../components/index";
import { createMarkup } from "../../utils";
import PropTypes from 'prop-types'
import { useHistory } from "react-router";

function Technology({values}) {
    const history = useHistory()
    console.log("dksaodksaods")
    const renderImg = ({image, description}) => <img src={image.url} alt={description} width="100%"/>

    const renderDescription = (description) => <p dangerouslySetInnerHTML={createMarkup(description)}></p>

    const openPost = (id) => {
        history.push(`/technology/${id}`)
    }

    const renderPost = (post) => {
        console.log(post)
        const {title, image, description, id} = post
        return (
            <Column key={'post-'+id}>
                <article onClick={() => openPost(id)}>
                    <p>
                        <strong dangerouslySetInnerHTML={createMarkup(title)} />
                        {image?.url ? renderImg({ image, description}): renderDescription(description)}
                    </p>
                </article>
            </Column>
        )
    }

    return (
        <Row>
            {
                values?.map(renderPost)
            }
        </Row>
    )
}

Technology.defaultProps = {
    values: []
}

Technology.propTypes = {
    values: PropTypes.array.isRequired
}

export default memo(Technology)