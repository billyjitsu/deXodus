package v2_test

import (
	"math/big"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/smartcontractkit/chainlink/v2/core/assets"
	"github.com/smartcontractkit/chainlink/v2/core/services/vrf/v2"
)

func TestListener_EstimateFeeJuels(t *testing.T) {
	callbackGasLimit := uint32(150_000)
	maxGasPriceGwei := assets.GWei(30).ToInt()
	weiPerUnitLink := big.NewInt(5898160000000000)
	actual, err := v2.EstimateFeeJuels(callbackGasLimit, maxGasPriceGwei, weiPerUnitLink)
	expected := big.NewInt(1780216203019246680)
	require.True(t, actual.Cmp(expected) == 0, "expected:", expected.String(), "actual:", actual.String())
	require.NoError(t, err)

	weiPerUnitLink = big.NewInt(5898161234554321)
	actual, err = v2.EstimateFeeJuels(callbackGasLimit, maxGasPriceGwei, weiPerUnitLink)
	expected = big.NewInt(1780215830399116719)
	require.True(t, actual.Cmp(expected) == 0, "expected:", expected.String(), "actual:", actual.String())
	require.NoError(t, err)

	actual, err = v2.EstimateFeeJuels(callbackGasLimit, maxGasPriceGwei, big.NewInt(0))
	require.Nil(t, actual)
	require.Error(t, err)
}
