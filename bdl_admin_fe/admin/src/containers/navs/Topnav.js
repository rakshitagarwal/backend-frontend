/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
/* eslint-disable */
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  searchPath,
  isDarkSwitchActive,
  adminRoot,
} from 'constants/defaultValues';
import { MobileMenuIcon, MenuIcon } from 'components/svg';
// import { getDirection, setDirection } from 'helpers/Utils';
import {
  setContainerClassnames,
  clickOnMobileMenu,
  changeLocale,
} from 'redux/actions';

// import TopnavEasyAccess from './Topnav.EasyAccess';
import { getCurrentColor } from 'helpers/Utils';
import TopnavNotifications from './Topnav.Notifications';
import TopnavDarkSwitch from './Topnav.DarkSwitch';
import logo from '../../assets/img/logo-light-small.png';
import drakLogo from '../../assets/img/thebigdeal-logo.png';
import { useEffect } from 'react';
import { NotificationManager } from 'components/common/react-notifications';
import { logout } from 'redux/authentication/actions.authentication';

const TopNav = ({
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  // locale,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  logoutUserAction,
  // changeLocaleAction,
}) => {
  const [isInFullScreen, setIsInFullScreen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [colorDark, setColorDark] = useState(false);
  const [logowidth, setLogoWidth] = useState(85);

  useEffect(() => {
    let color = getCurrentColor();
    color.includes('dark') ? setColorDark(true) : setColorDark(false);
    let windowWidth = window.innerWidth;
    windowWidth < 500 && setLogoWidth(70);
  }, []);
  const search = () => {
    history.push(`${searchPath}?key=${searchKeyword}`);
    setSearchKeyword('');
  };

  // const handleChangeLocale = (_locale, direction) => {
  //   changeLocaleAction(_locale);

  //   const currentDirection = getDirection().direction;
  //   if (direction !== currentDirection) {
  //     setDirection(direction);
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 500);
  //   }
  // };

  const isInFullScreenFn = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };
  // TODO: Search Function uncomment to use
  // const handleSearchIconClick = (e) => {
  //   if (window.innerWidth < menuHiddenBreakpoint) {
  //     let elem = e.target;
  //     if (!e.target.classList.contains('search')) {
  //       if (e.target.parentElement.classList.contains('search')) {
  //         elem = e.target.parentElement;
  //       } else if (
  //         e.target.parentElement.parentElement.classList.contains('search')
  //       ) {
  //         elem = e.target.parentElement.parentElement;
  //       }
  //     }

  //     if (elem.classList.contains('mobile-view')) {
  //       search();
  //       elem.classList.remove('mobile-view');
  //       removeEventsSearch();
  //     } else {
  //       elem.classList.add('mobile-view');
  //       addEventsSearch();
  //     }
  //   } else {
  //     search();
  //   }
  //   e.stopPropagation();
  // };

  const handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      removeEventsSearch();
      setSearchKeyword('');
    }
  };

  const removeEventsSearch = () => {
    document.removeEventListener('click', handleDocumentClickSearch, true);
  };

  // TODO: Search Handler
  // const addEventsSearch = () => {
  //   document.addEventListener('click', handleDocumentClickSearch, true);
  // };

  // const handleSearchInputKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     search();
  //   }
  // };

  const toggleFullScreen = () => {
    const isFS = isInFullScreenFn();

    const docElm = document.documentElement;
    if (!isFS) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsInFullScreen(!isFS);
  };

  const handleLogout = () => {
    logoutUserAction(history);
    localStorage.clear();
    NotificationManager.primary(null, 'Logout successfully');
  };

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,
      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };

  // const { messages } = intl;
  return (
    <nav className="navbar fixed-top">
      <div className="d-flex align-items-center navbar-left">
        <NavLink
          to="#"
          location={{}}
          className="menu-button d-none d-md-block"
          onClick={(e) =>
            menuButtonClick(e, menuClickCount, containerClassnames)
          }
        >
          <MenuIcon />
        </NavLink>
        <NavLink
          to="#"
          location={{}}
          className="menu-button-mobile d-xs-block d-sm-block d-md-none"
          onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
        >
          <MobileMenuIcon />
        </NavLink>

        {/* TODO: Uncomment this to activate search in top nav bar */}
        {/* <div className="search">
          <Input
            name="searchKeyword"
            id="searchKeyword"
            placeholder={messages['menu.search']}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => handleSearchInputKeyPress(e)}
          />
          <span
            className="search-icon"
            onClick={(e) => handleSearchIconClick(e)}
          >
            <i className="simple-icon-magnifier" />
          </span>
        </div> */}

        <div className="d-inline-block">
          {/* TODO: uncomment this to activate language options */}
          {/* <UncontrolledDropdown className="ml-2">
            <DropdownToggle
              caret
              color="light"
              size="sm"
              className="language-button"
            >
              <span className="name">{locale.toUpperCase()}</span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              {localeOptions.map((l) => {
                return (
                  <DropdownItem
                    onClick={() => handleChangeLocale(l.id, l.direction)}
                    key={l.id}
                  >
                    {l.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </div>
        {/* <div className="position-relative d-none d-none d-lg-inline-block">
          <a
            className="btn btn-outline-primary btn-sm ml-2"
            target="_top"
            href={buyUrl}
          >
            <IntlMessages id="user.buy" />
          </a>
        </div> */}
      </div>

      <NavLink to={adminRoot}>
        <img
          src={colorDark ? logo : drakLogo}
          alt="TBD"
          width={`${logowidth}px`}
        />
        {/* <span className="logo d-none d-xs-block" />
        <span className="logo-mobile d-block d-xs-none" /> */}
      </NavLink>

      <div className="navbar-right">
        {isDarkSwitchActive && <TopnavDarkSwitch />}
        <div className="header-icons d-inline-block align-middle">
          {/* <TopnavEasyAccess /> */}
          <TopnavNotifications />
          <button
            className="header-icon btn btn-empty d-none d-sm-inline-block"
            type="button"
            id="fullScreenButton"
            onClick={toggleFullScreen}
          >
            {isInFullScreen ? (
              <i className="simple-icon-size-actual d-block" />
            ) : (
              <i className="simple-icon-size-fullscreen d-block" />
            )}
          </button>
        </div>
        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <span className="name mr-1">Sarah Kortney</span>
              <span>
                <img alt="Profile" src="/assets/img/profiles/l-1.jpg" />
              </span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              <DropdownItem>Account</DropdownItem>
              <DropdownItem>Features</DropdownItem>
              <DropdownItem>History</DropdownItem>
              <DropdownItem>Support</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => handleLogout()}>
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    logoutUserAction: logout,
    changeLocaleAction: changeLocale,
  })(TopNav)
);
