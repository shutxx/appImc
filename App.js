import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Icon } from '@rneui/themed';

import HomeScreen from "./views/HomeScreen";
import ListScreen from "./views/ListScreen";
import FormScreen from "./views/FormScreen";
import DetailsScreen from "./views/DetailsScreen";

const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={({ navigation }) => {
            return {
              title: "Lista de Pessoas",
              headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('FormScreen')}
                  type="clear"
                  icon={<Icon name="add" size={25} color="white" />}
                />
              ),
            }
          }}
        />
        <Stack.Screen
          name="FormScreen"
          component={FormScreen}
          options={{
            title: "Formulário de Pessoa",
          }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{
            title: "Detallhes da Pessoa",
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const screenOptions = {
  headerStyle: {
    backgroundColor: "#336699",
    borderColor: 'gray',
    borderWidth: 1,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};