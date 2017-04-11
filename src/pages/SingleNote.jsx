
import React from 'react';

export default class SingleNote extends React.Component {
    render() {
        console.log('SingleNote');

        return (
            <div>
                <button></button>
                <textarea className="singleNote_textarea"></textarea>
            </div>
        );
    }
}
