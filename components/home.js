import {View, Text, Button} from 'react-native'
import TabBar from '../App'
export default function Home({navigation,route}) {

    async function redirecionar() {
      setTimeout(() => {
        navigation.navigate('TabBar')
      }, 2000);
    }

    redirecionar();

    return (
      <View>
        <Text>Agenda</Text>

      </View>
    );
  }