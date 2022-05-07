import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../state/index"

const Blogs = () => {

    const account = useSelector((state) => state.account);
    const dispatch = useDispatch();
    const { depositMoney, withdrawMoney } = bindActionCreators(actionCreators, dispatch)
    console.log(account)

    return(
    <div>
        <h1>Blog Articles</h1>
        {account}
        <br></br>
        <button onClick={() => depositMoney(1000)}> Deposit </button>
        <button onClick={() => withdrawMoney(1000)}> withdraw </button>
    </div>
    );
  };
  
  export default Blogs;