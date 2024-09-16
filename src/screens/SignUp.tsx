import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Background Image
const BackgroundImage= ()=>{
  return(
    <Image style={sty.backgroundImage} source={
      require('../../assets/img/back.jpg')
    }/>
  );
}

//Header text
const HedederText=()=>{
  return(
    <View style={sty.hederTextArea}>
      <Text style={sty.hederText}>
        {'Create \n Account'}
      </Text>
    </View>
  )
}

const SignInButton=( p : any)=>{

  const stack =p.stack;

  const GotoHomePage=()=>{
    stack.navigate('Drawer');
  };
  
  // Input Text Area
  const[userEmail,setUserEmail]= useState('')
  const[userPassword,setUserPassword]= useState('')

  return(
    <View>
      
      {/* Text Area */}
     <View style={sty.textFieldArea}>
        {/* Reg No Field */}
        <View style={sty.textField}>
          <TextInput placeholder='Registation Number 2021/E/XXX'
                    placeholderTextColor={'#9d9d9d'}
                    style={sty.textInputField}
                    onChangeText={(v)=>setUserEmail(v)}
          />
        </View>

        {/* Email Field */}
        <View style={sty.textField}>
          <TextInput placeholder='Email Address'
                    placeholderTextColor={'#9d9d9d'}
                    style={sty.textInputField}
                    onChangeText={(v)=>setUserEmail(v)}
          />
        </View>

        {/* Password Field */}
        <View style={sty.textField}>
          <TextInput placeholder='Enter Password'
                    placeholderTextColor={'#9d9d9d'}
                    secureTextEntry
                    style={sty.textInputField}
                    onChangeText={(v)=>setUserPassword(v)}
          />
        </View>

        {/* Confirm Password Field */}
        <View style={sty.textField}>
          <TextInput placeholder='Confirm Password'
                    placeholderTextColor={'#9d9d9d'}
                    secureTextEntry
                    style={sty.textInputField}
                    onChangeText={(v)=>setUserPassword(v)}
          />
        </View>
      </View>

      {/* Sign In Label Right Side */}
      <View style={sty.signInArea}>
        <View style={sty.signInLabel}>
          <Text style={sty.signInLabelText}>Sign In</Text>
        </View>

      {/* Sign In Button */}
        <View style={sty.signInButtonArea}>
          <TouchableOpacity onPress={GotoHomePage} activeOpacity={0.5}>
            <View style={sty.signInButton}>
              <Icon name="arrow-forward-sharp"  size={30} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    
  );
 }

 const BottamLayer=(p:any)=>{

  const stack = p.stack;

  const GotoSignIn =()=>{
    stack.navigate('Login');
  }

  return(
    <View style={sty.bottomArea}>
      <View  style={sty.fgtPasswordButtonField}>
          <TouchableOpacity onPress={GotoSignIn} activeOpacity={0.4}>
          <Text style={sty.signUpButton}>Sign In</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
 }


const SignUp = (props:any) => {
  const stack = props.navigation;
  return (
    <View style={sty.container}>
      
      {/* Background image */}
      <BackgroundImage/>

      {/* Heder Text */}
      <HedederText/>

      {/* Sign In Area */}
      <SignInButton stack={stack}/>

      {/* Bottom  */}
      <BottamLayer stack={stack}/>


      
    </View>
  )
}


const sty =StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
  },
  backgroundImage:{
    width:'100%',
    height:'100%',
    resizeMode:'stretch',
    position:'absolute'
  },
  hederTextArea:{
    justifyContent:'center',
    marginTop:150
  },
  hederText:{
    fontSize:70,
    fontWeight:'600',
    textAlign:'center',
    color:'white'
  },
  textFieldArea:{
    marginHorizontal:40,
    marginTop:75
  },
  textField:{
    backgroundColor:'white',
    height:55,
    borderRadius:20,
    paddingHorizontal:20,
    marginVertical:10
  },
  textInputField:{
    fontSize:20,
    color:'#3b3b3b',
    fontWeight:'400',
  },
  signInArea:{
    flexDirection:'row',
    marginHorizontal:40,
    position:'absolute',
    marginTop:410,

  },
  signInLabel:{
    height:50,
    flex:1,
    justifyContent:'center',
  },
  signInLabelText:{
    fontSize:35,
    fontWeight:'500'
  },
  signInButtonArea:{
    height:60,
    flex:1,
    alignItems:'flex-end'
  },
  signInButton:{
    backgroundColor:'#367cfe',
    height:60,
    width:60,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center'
    
  },
  bottomArea:{
    flexDirection:'row',
    marginHorizontal:40,
    position:'absolute',
    marginTop:880,
  },
  bottomLayer:{
    flexDirection:'row'
  },
  signUpButtonField:{
    height:50,
    flex:1,
    
  },
  signUpButton:{
    fontSize:20
  },
  fgtPasswordButtonField:{
    height:50,
    flex:1,
    alignItems:'flex-end'
    

  },
  
  
})

export default SignUp