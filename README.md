# limit_order
This repo was created to interact with limit order contract

Run scripts/multinode-local-testnet.sh before run this script

INIT='{"purchase_price":{"amount":"100","denom":"umlg"},"transfer_price":{"amount":"999","denom":"umlg"}}'

EX_PAIR='{"execute_order_book_pair":{"asset_infos":[{"native_token":{"denom": "orai"}},{"native_token":{"denom": "usdt"}}]}}'
CONTRACT=orai17p9rzwnnfxcjp32un9ug7yhhzgtkhvl9jfksztgw5uh69wac2pgsfzt40v
export NODE=(--node tcp://localhost:26657)
export TXFLAG=($NODE --chain-id=testing --gas-prices 0.0001orai --gas auto --gas-adjustment 1.3 -b block)

CREATE_PAIR='{"create_order_book_pair":{"base_coin_info":{"native_token":{"denom": "orai"}},"quote_coin_info":{"native_token":{"denom":"stake"}},"precision":"10","min_quote_coin_amount": "10"}}'

oraid tx wasm execute $CONTRACT "$CREATE_PAIR" --amount 2orai --from=validator1 --keyring-backend=test --home ~/.oraid/validator1 $TXFLAG -y -b block -o json

oraid tx wasm execute $CONTRACT "$EX_PAIR" --amount 200orai --from=validator1 --keyring-backend=test --home ~/.oraid/validator1 $TXFLAG -y -b block -o json# cw20
