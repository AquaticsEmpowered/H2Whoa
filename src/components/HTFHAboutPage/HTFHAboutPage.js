import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import './HTFH.css'

class HTFHAboutPage extends Component {

    render() {
        return (
            <>
                <div>
                    <a href="http://aquaticsempowered.org/hot-tubbing-for-hope/" >Hot Tubbing For Hope</a>
                </div>
                <br />
                <div>
                    <img src="/images/LeoDunkirk.jpg" className="center" alt="Hot Tubbing for Hope" />
                </div>

                <p>Come join us November 15, 16, and 17th to help fundraise for the first ever Hot Tubbing for Hope.
                    We will raise money to help promote and expand the launch of aquatics empowered helping other
                     charities worldwide and small towns establish and maintain aquatic therapy resources.</p>

                {/* <a href="https://ssl.charityweb.net/aquaticsempowered/hottubbingforhope/" target="_blank" 
                rel="noopener noreferrer" class="button">Donate!</a> */}
                <a className="ui button" href="https://ssl.charityweb.net/aquaticsempowered/hottubbingforhope/">Donate</a>
            </>
        )
    }
}

export default connect()(HTFHAboutPage);
