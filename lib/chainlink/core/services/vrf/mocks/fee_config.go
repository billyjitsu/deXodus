// Code generated by mockery v2.28.1. DO NOT EDIT.

package mocks

import (
	common "github.com/ethereum/go-ethereum/common"
	assets "github.com/smartcontractkit/chainlink/v2/core/assets"

	config "github.com/smartcontractkit/chainlink/v2/core/chains/evm/config"

	mock "github.com/stretchr/testify/mock"
)

// FeeConfig is an autogenerated mock type for the FeeConfig type
type FeeConfig struct {
	mock.Mock
}

// LimitDefault provides a mock function with given fields:
func (_m *FeeConfig) LimitDefault() uint32 {
	ret := _m.Called()

	var r0 uint32
	if rf, ok := ret.Get(0).(func() uint32); ok {
		r0 = rf()
	} else {
		r0 = ret.Get(0).(uint32)
	}

	return r0
}

// LimitJobType provides a mock function with given fields:
func (_m *FeeConfig) LimitJobType() config.LimitJobType {
	ret := _m.Called()

	var r0 config.LimitJobType
	if rf, ok := ret.Get(0).(func() config.LimitJobType); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(config.LimitJobType)
		}
	}

	return r0
}

// PriceMaxKey provides a mock function with given fields: addr
func (_m *FeeConfig) PriceMaxKey(addr common.Address) *assets.Wei {
	ret := _m.Called(addr)

	var r0 *assets.Wei
	if rf, ok := ret.Get(0).(func(common.Address) *assets.Wei); ok {
		r0 = rf(addr)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*assets.Wei)
		}
	}

	return r0
}

type mockConstructorTestingTNewFeeConfig interface {
	mock.TestingT
	Cleanup(func())
}

// NewFeeConfig creates a new instance of FeeConfig. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
func NewFeeConfig(t mockConstructorTestingTNewFeeConfig) *FeeConfig {
	mock := &FeeConfig{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
