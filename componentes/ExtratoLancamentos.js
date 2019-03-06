import React from "react";
import {
  StyleSheet,
  TextInput,
  Alert,
  Text,
  View,
  ScrollView,
  Button,
  Modal,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Picker
} from "react-native";

export default class ExtratoLancamento extends React.Component {
  render() {
    const { lancamentos } = this.props;

    return (
      <ScrollView style={{ paddingRight: 30 }}>
        {lancamentos.map((valor, k) => {
          return (
            <TouchableOpacity
              style={{
                width: "100%",
                flexDirection: "row",
                marginLeft: 12,
                marginRight: 12,
                borderBottomColor: "#b5b8bc",
                borderBottomWidth: 1
              }}
              key={k}
            >
              <Image source={valor.despesa.icone} style={styles.ImageStyle} />

              <View
                style={{
                  width: "100%"
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 30,
                    flexDirection: "row",
                    paddingVertical: 8
                  }}
                >
                  <View style={{ width: 200 }}>
                    <Text>{valor.despesa.nome}</Text>
                  </View>
                  <View
                    style={{
                      width: 113,
                      alignItems: "flex-end"
                    }}
                  >
                    <Text style={{ color: "blue" }}>{valor.valor}</Text>
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 40
                  }}
                >
                  <Text>
                    {valor.conta.nome} | {valor.usuario.nome}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
   ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  },


});

