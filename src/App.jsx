import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { networkAtom, jobsAtom, notificationsAtom, messagesAtom } from './atoms'

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  )
 
}

function MainApp() {
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsAtomCount = useRecoilValue(jobsAtom);
  const notificationsAtomCount = useRecoilValue(notificationsAtom);
  const [ messagesAtomCount, setMessageAtomCount ]  = useRecoilState(messagesAtom);

  return (
    <>
    <button>Home</button>
    <button>My network ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount})</button>
    <button>Jobs {jobsAtomCount} </button>
    <button>Messaging {messagesAtomCount} </button>
    <button>Notifications {notificationsAtomCount}</button>


    <button onClick = {() => {
      setMessageAtomCount(messagesAtomCount + 1);
    }}>Increase Count</button>
    <ButtonUpdater />
    </>
  )
}

function ButtonUpdater() {
  const setNotificationsAtomCount = useSetRecoilState(notificationsAtom);
  return (
    <button onClick = {() => {
      setNotificationsAtomCount(c => c + 1);
    }}>Increase Count</button>
  )
}

export default App
