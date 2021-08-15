import React from 'react'
import { Divider, Icon } from 'semantic-ui-react'

const ItemInCart = ({ item, removeItem, getItemInfo }) => (
    <React.Fragment>
        <h2>{item.name}</h2>
            <h4>
                ${item.price}
                <button type="button" className="btn btn-danger cartBtn" onClick={() => removeItem(item)}>
                    Remove Item <Icon name='remove circle' />
                </button>
                <button type="button" className="btn btn-info cartBtn" onClick={() => getItemInfo(item)}>
                    Info <Icon name='info circle' />
                </button>
            </h4>
        <Divider section />
    </React.Fragment>
)

export default ItemInCart