import React, { Component } from 'react';
import { connect } from 'react-redux';

import StoryCard from './StoryCard';
import LandingPageModal from '../../LandingPageModal/LandingPageModal';
import MobileNav from '../../Menus/MobileNav/MobileNav';
// import FilterMenu from '../../Menus/FilterMenu/FilterMenu';

import { Card } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'
import '../StoriesPage.css'


class StoriesPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_STORIES' });
        this.props.dispatch({ type: 'FETCH_USER' });
    }

    render() {
        return (
            <>
                {/* <LandingPageModal /> */}
                <MobileNav />
                <Card.Group centered>
                    {this.props.reduxStore.stories.storiesReducer.map(item => 
                        <StoryCard key={item.id} story={item}/>
                    )}
                </Card.Group>
            </>
        )
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(stateToProps)(StoriesPage);
