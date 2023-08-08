import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from '../Context/AuthContext';

import { Login } from '../pages/Login';
import { AddUserLogin } from '../pages/AddUserLogin';
import { RecoverPassword } from '../pages/RecoverPassword';
import { UpdatePassword } from '../pages/UpdatePassword';

import { Dashboard } from '../pages/Dashboard';
import { Users } from '../pages/Users';
import { AddUser } from '../pages/AddUser';
import { ViewUser } from '../pages/ViewUser';
import { EditUser } from '../pages/EditUser';
import { EditUserPassword } from '../pages/EditUserPassword';
import { ViewProfile } from '../pages/ViewProfile';
import { EditProfile } from '../pages/EditProfile';
import { EditProfilePassword } from '../pages/EditProfilePassword';
import { EditProfileImage } from '../pages/EditProfileImage';
import { EditUserImage } from '../pages/EditUserImage';

import { ViewSiteHome } from '../pages/ViewSiteHome';
import { EditSiteHome } from '../pages/EditSiteHome';
import { EditSiteHomeImageTop } from '../pages/EditSiteHomeImageTop';

import { ListSiteAbout } from '../pages/ListSiteAbout';
import { ViewSiteAbout } from '../pages/ViewSiteAbout';
import { AddSiteAbout } from '../pages/AddSiteAbout';
import { EditSiteAbout } from '../pages/EditSiteAbout';

import { ViewSiteContContact } from '../pages/ViewSiteContContact';
import { EditSiteContContact } from '../pages/EditSiteContContact';

import { ListSiteMsgContact } from '../pages/ListSiteMsgContact';
import { ViewSiteMsgContact } from '../pages/ViewSiteMsgContact';
import { AddSiteMsgContact } from '../pages/AddSiteMsgContact';
import { EditSiteMsgContact } from '../pages/EditSiteMsgContact';

function CustomRoute({ isPrivate, ...rest }) {
    const { authenticated } = useContext(Context);

    if (isPrivate && !authenticated) {
        return <Redirect to="/" />
    }
    return <Route { ...rest} />
}

export default function RoutesAdm() {
    return (
        <Switch>
            <CustomRoute exact path="/" component={Login} />
            <CustomRoute exact path="/add-user-login" component={AddUserLogin} />
            <CustomRoute exact path="/recover-password" component={RecoverPassword} />
            <CustomRoute exact path="/update-password/:key" component={UpdatePassword} />

            <CustomRoute exact isPrivate path="/dashboard" component={Dashboard} />
            <CustomRoute exact isPrivate path="/users" component={Users} />
            <CustomRoute exact isPrivate path="/add-user" component={AddUser} />
            <CustomRoute exact isPrivate path="/view-user/:id" component={ViewUser} />
            <CustomRoute exact isPrivate path="/edit-user/:id" component={EditUser} />
            <CustomRoute exact isPrivate path="/edit-user-password/:id" component={EditUserPassword} />
            <CustomRoute exact isPrivate path="/view-profile" component={ViewProfile} />
            <CustomRoute exact isPrivate path="/edit-profile" component={EditProfile} />
            <CustomRoute exact isPrivate path="/edit-profile-password" component={EditProfilePassword} />
            <CustomRoute exact isPrivate path="/edit-profile-image" component={EditProfileImage} />
            <CustomRoute exact isPrivate path="/edit-user-image/:id" component={EditUserImage} />

            <CustomRoute exact isPrivate path="/view-site-home" component={ViewSiteHome} />
            <CustomRoute exact isPrivate path="/edit-site-home" component={EditSiteHome} />
            <CustomRoute exact isPrivate path="/edit-site-home-image-top" component={EditSiteHomeImageTop} />

            <CustomRoute exact isPrivate path="/list-site-about" component={ListSiteAbout} />
            <CustomRoute exact isPrivate path="/view-site-about/:id" component={ViewSiteAbout} />
            <CustomRoute exact isPrivate path="/add-site-about" component={AddSiteAbout} />
            <CustomRoute exact isPrivate path="/edit-site-about/:id" component={EditSiteAbout} />

            <CustomRoute exact isPrivate path="/view-site-cont-contact" component={ViewSiteContContact} />
            <CustomRoute exact isPrivate path="/edit-site-cont-contact" component={EditSiteContContact} />
            <CustomRoute exact isPrivate path="/list-site-msg-contact" component={ListSiteMsgContact} />
            <CustomRoute exact isPrivate path="/view-site-msg-contact/:id" component={ViewSiteMsgContact} />
            <CustomRoute exact isPrivate path="/add-site-msg-contact" component={AddSiteMsgContact} />
            <CustomRoute exact isPrivate path="/edit-site-msg-contact/:id" component={EditSiteMsgContact} />
        </Switch>
    );
};