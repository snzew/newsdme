import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { consoleSpyForProptypeError } from '../../../setupTests'

import { shallow, mount } from "enzyme";
import { RegisterComp } from '../../../components/Auth/RegisterComponent';


describe("RegisterComponent", () => {
	let component;

	const registerMock = jest.fn()

	consoleSpyForProptypeError()

	beforeEach(() => {
		component = shallow(<RegisterComp registerUser={registerMock} />)
	})

	it("should render without errors", () => {

		expect(component.length).toEqual(1)
		expect(component.find("input").length).toEqual(4)
		expect(component.find('button').length).toEqual(1)
		
		expect(console.error).not.toHaveBeenCalled()
	})

	it("should dispatch registration if form is valid", () => {

		component.find('#username').simulate('change',{target:{value:"someUser",name:'username'}})
		component.find('#email').simulate('change',{target:{value:"some@email.com",name:'email'}})
		component.find('#password').simulate('change',{target:{value:"someUser1234!",name:'password'}})
		component.find('#confirmPassword').simulate('change',{target:{value:"someUser1234!",name:'confirmPassword'}})


		const onRegistrationSpy = jest.spyOn(component.instance(), 'submitRegistration')

		component.instance().submitRegistration({preventDefault(){}});

		expect(onRegistrationSpy).toHaveBeenCalledTimes(1);

		expect(component.find(".errorMsg").length).toEqual(0)

	})

	it("should not dispatch registration if password is invalid", () => {
		component.setState({
			username: "someUser",
			password: "someUs4",
			confirmPassword:"someUser1234!",
			email: "some@email.com",
		})

		const onRegistrationSpy = jest.spyOn(component.instance(), 'submitRegistration')

		component.instance().submitRegistration({preventDefault(){}});

		expect(onRegistrationSpy).toHaveBeenCalledTimes(1);

		expect(component.find(".errorMsg").length).toEqual(1)

	})

	it("should not dispatch registration if email is invalid", () => {
		component.setState({
			username: "someUser",
			password: "someUs4!2",
			confirmPassword:"someUser1234!",
			email: "someemail.com",
		})

		const onRegistrationSpy = jest.spyOn(component.instance(), 'submitRegistration')

		component.instance().submitRegistration({preventDefault(){}});

		expect(onRegistrationSpy).toHaveBeenCalledTimes(1);

		expect(component.find(".errorMsg").length).toEqual(1)

	})
	it("should not dispatch registration if passwords are not matching", () => {
		component.setState({
			username: "someUser",
			password: "someUs4!2",
			confirmPassword:"someUser1234!",
			email: "some@email.com",
		})

		const onRegistrationSpy = jest.spyOn(component.instance(), 'submitRegistration')

		component.instance().submitRegistration({preventDefault(){}});

		expect(onRegistrationSpy).toHaveBeenCalledTimes(1);

		expect(component.find("#passwordMatchingError").length).toEqual(1)

	})


})

describe("RegisterComp", () => {

	it("should render errorMsg", () => {
		const component = shallow(<RegisterComp isLoading={false} registerUser={jest.fn()} registrationErrorMsg="some error"/>);

		console.log(component.debug())

		expect(component.instance().props.registrationErrorMsg).toEqual("some error")
	
	})
	it("should render isLoading while loading", () => {
		const component = shallow(<RegisterComp isLoading={true} registerUser={jest.fn()}/>);

		console.log(component.debug())

		expect(component.find("#registrationErrorMsg").length).toEqual(0)
		
		expect(component.length).toEqual(1)
		expect(component.find("input").length).toEqual(0)
		expect(component.find('button').length).toEqual(0)
			
	})
})
