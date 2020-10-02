import React, { Component } from 'react';

class ReactCaptchaGenerator extends Component {
    constructor(props) {
        super();
        this.state = {
            height: props.height,
            width: props.width,
            textColor: props.textColor,
            fontFamily: props.fontFamily,
            fontSize: props.fontSize,
            paddingLeft: props.paddingLeft,
            paddingTop: props.paddingTop,
            length: props.length,
            background: props.background,
            text: '',
            toggleRefresh: false
        };
        this.setData = this.setData.bind(this);
    }

    componentDidMount = () => {
        this.setData();
    }

    componentDidUpdate({ toggleRefresh }, prevState) {
        if (toggleRefresh !== prevState.toggleRefresh) {
            this.setData();
        }
    }

    setData() {
        let { text } = this.props;
        let length = this.state.length;
        if (text !== '') {
            length = text.length;
        }

        this.text = [];
        this.originText = [];
        this.possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            let char = this.possible.charAt(Math.floor(Math.random() * this.possible.length));
            if (text !== '') {
                char = text[i];
            }
            this.text.push(
                `<text
                    font-family="${this.state.fontFamily}"
                    font-size="${this.state.fontSize}"
                    x="${this.state.paddingLeft * i}"
                    y="${this.state.paddingTop}"
                    fill="${this.props.textColor ? this.props.textColor : '#' + (((1 << 24) * Math.random()) | 0).toString(16)}"
                    transform="rotate(${Math.random() * (5 - 0) + 0})"
                >${char}</text>`
            );
            this.originText.push(char);

            // Add line
            let x1 = Math.floor(Math.random() * this.state.width)
            let x2 = Math.floor(Math.random() * this.state.width)
            let y1 = Math.floor(Math.random() * this.state.height)
            let y2 = Math.floor(Math.random() * this.state.height)
            this.text.push(
                `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"  style="stroke:rgb(255,0,0);stroke-width:2" />`
            )

        }
        this.props.result(this.originText.join(''));
        this.setState(state => ({
            ...state,
            text: this.text.join()
        }));
    }

    render() {
        const { height, width, text } = this.state;
        let image;
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" height="${height}" width="${width}">${text}</svg>`;
        image = btoa(svg);
        return <img style={{ background: this.state.background, height: height, width: width }} src={`data:image/svg+xml;base64,${image}`} alt="" />;
    }
}

ReactCaptchaGenerator.defaultProps = {
    height: 100,
    width: 100,
    textColor: false,
    fontFamily: 'Verdana',
    fontSize: '30',
    paddingLeft: '20',
    paddingTop: '60',
    length: '5',
    background: 'none',
    text: '',
    toggleRefresh: false
};

export default ReactCaptchaGenerator;
