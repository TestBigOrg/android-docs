import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers'
import includes from 'underscore.string/include';
import { Container, Grid, Span } from 'react-responsive-grid';
import { config } from 'config';

import 'css/styles.css';
import 'css/markdown-styles.css'

module.exports = React.createClass({
  propTypes: {
    children: React.PropTypes.object
  },
  getInitialState() {
    if (process.browser) {
      let mqls = [
        { name: 'widescreen', query: window.matchMedia('(min-width: 1200px)') },
        { name: 'desktop', query: window.matchMedia('(min-width: 961px)') },
        { name: 'tablet', query: window.matchMedia('(max-width: 960px)') },
        { name: 'mobile', query: window.matchMedia('(max-width: 640px)') }
      ];
      mqls.forEach(q => q.query.addListener(this.mediaQueryChanged));
      return {
        // media queryMatches
        mqls: mqls,
        // object of currently matched queries, like { desktop: true }
        queryMatches: {},
        showNav: false
      };
    } else {
      return {
        mqls: { },
        queryMatches: {
          desktop: true
        },
        showNav: false
      };
      }
    },
    toggleNav() {
  this.setState({ showNav: !this.state.showNav });
},
  componentDidMount() {
    this.mediaQueryChanged();
  },
  componentWillUnmount() {
    this.state.mqls.forEach(q => q.removeListener(this.mediaQueryChanged));
  },
  mediaQueryChanged() {
    this.setState({
      queryMatches: this.state.mqls.reduce((memo, q) => {
        memo[q.name] = q.query.matches;
        return memo;
      }, {})
    });
  },
  render() {
    const mapSdkActive = includes(this.props.location.pathname, '/map-sdk/');
    const mapboxJavaActive = includes(this.props.location.pathname, '/mapbox-services/');
    const examplesActive = includes(this.props.location.pathname, '/examples/');
    var activeTitle;
    let { queryMatches, showNav } = this.state;

    const childPages = this.props.children.props.route.pages.map((p) => {
      if (includes(this.props.location.pathname, p.file.dir)) {
        if (p.data.title !== undefined) {
          return {
            title: p.data.title,
            path: p.path,
            toc: p.data.toc,
          };
        }
      }
    });

    const docPages = childPages.map((child) => {
      if (child === undefined) {
        return;
      }
      const isActive = prefixLink(child.path) === this.props.location.pathname
      isActive ? activeTitle = child.title : '';

      return (<div onClick={this.toggleNav}>
        <li key={child.path}>
          <Link to={prefixLink(child.path)} className={'page-hover'} style={{textDecoration: 'none'}}>
            {isActive ? <strong>{child.title}</strong> : child.title }
          </Link>
        </li>
        {isActive ? <div className={'ml12'} dangerouslySetInnerHTML={{ __html: child.toc }}/> : ''}
        </div>
      )
    });

    return (
      <div className={'grid'}>

        {/* Site top toolbar */}
        <div className={'col--12 z1 hmin48 bg-denim shadow-darken50 fixed'}>

        {/* Site Navigation */}
        <div className={`align-t hmin48 flex-parent-inline flex-parent--center-cross flex-parent--left-main ${queryMatches.desktop ? 'w240' : ''}`}><a href={'https://mapbox.com/'}><div className={queryMatches.desktop ? 'ml12 mb-logo--s mb-logo--white' : ''}/></a></div>
        <Link className={`py12 transition btn color-white bg-transparent bg-darken10-on-active bg-darken10-on-hover txt-s  ${mapSdkActive ? 'is-active' : ''}`} to={prefixLink('/map-sdk/5.0.1/getting-started/')}>Map SDK</Link>
        <Link className={`py12 transition btn color-white bg-transparent bg-darken10-on-active bg-darken10-on-hover txt-s  ${mapboxJavaActive ? 'is-active' : ''}`} to={prefixLink('/mapbox-services/2.0.1/getting-started/')}>Mapbox Services</Link>
        <Link className={`py12 transition btn color-white bg-transparent bg-darken10-on-active bg-darken10-on-hover txt-s  ${examplesActive ? 'is-active' : ''}`} to={prefixLink('/examples/basics/')}>Examples</Link>
        </div>
        {queryMatches.tablet && <div>
          <button onClick={this.toggleNav}
          className={`btn m6 flex-parent flex-parent--center-cross bg-lighten10 bg-lighten25-on-hover transition round txt-s z1 right absolute`}>
          {activeTitle}
          <svg className={'icon flex-child'}><use href={showNav ? '#icon-caret-up' : '#icon-caret-down'}/></svg></button>
          {showNav && <div
            className='mt6 scroll-styled col--12 toc z1'>
              {docPages}
            </div>}
            </div>}

          {queryMatches.desktop && <div className={'w240 toc'}>{docPages}</div>}

          <div className={queryMatches.desktop ? 'ml240 p48' : 'p12'}>
          {this.props.children}
          </div>
      </div>
    );
  }
});
