import React from "react";
import { Typeahead , Menu, MenuItem} from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import PropTypes from 'prop-types'

const CustomTypeAhead = (props) => {
    const {options , selected , handleSelect , idKey, isAllSelected,renderLabel, placeholder} = props
    const getDefaults = () =>{
        if(selected.includes('all')){
            return options
        }
        if(selected.length){
            return options.filter(d => selected.includes(d[idKey]))
        }
        return []
    }
    console.log(isAllSelected)
    return (
        <Typeahead
            id='custom-typeahead'
            multiple
            placeholder={placeholder}
            selected={getDefaults()}
            bsSize='small'
            labelKey={renderLabel}
            options={[
                { [idKey]: 'all', label: 'Add/Remove All' },
                ...options
            ]}
            // will provide you the selected input 
            onChange={data => {
                for (const d of data) {
                    if(d[idKey] === 'all'){
                        if(isAllSelected){
                            return handleSelect([])
                        }
                        return handleSelect(options)
                    }
                }
                return handleSelect(data)
            }}
            // will provide you the 
            renderMenu={(results, menuProps) => (
                <Menu {...menuProps}>
                    {results.map((result, index) => {
                        return (
                            <MenuItem option={result} position={index} key={result[idKey]}>
                                {result.label}
                            </MenuItem>
                        )
                    })}
                </Menu>
            )}
        />
    );
}

CustomTypeAhead.propTypes = {
    // string indicating what the options id key is name
    idKey: PropTypes.string,
    // array of JSONs where one of the keys is the [idKey] and the other one is the 'label'
    options: PropTypes.array,
    // function that is going to handle the selection items
    // must be implemented in order to having access to the selection
    handleSelect: PropTypes.func,
    // array of idKeys that are selected
    selected: PropTypes.array,
    // boolean to indicate if all the items are selected
    isAllSelected: PropTypes.bool,
    // function to return what the label would be
    renderLabel: PropTypes.func,
    // placeholder
    placeholder: PropTypes.string
}

CustomTypeAhead.defaultProps = {
    idKey: 'id',
    options: [],
    handleSelect: (d) => null,
    selected: [],
    isAllSelected: false,
    renderLabel: (d) => `${d.label}`,
    placeholder: ''
}

export default CustomTypeAhead

