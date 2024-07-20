import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Appbar,
  Divider,
  Headline,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  Paragraph,
  TextInput,
  ThemeProvider,
  TouchableRipple,
} from 'react-native-paper';
import { Dropdown, MultiSelectDropdown } from 'react-native-paper-dropdown';

const OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

const MULTI_SELECT_OPTIONS = [
  {
    label: 'White',
    value: 'white',
  },
  {
    label: 'Red',
    value: 'red',
  },
  {
    label: 'Blue',
    value: 'blue',
  },
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Orange',
    value: 'orange',
  },
];

export default function App() {
  const [nightMode, setNightmode] = useState(false);
  const [gender, setGender] = useState<string>();
  const [colors, setColors] = useState<string[]>([]);
  const Theme = nightMode ? MD3DarkTheme : MD3LightTheme;

  return (
    <ThemeProvider theme={Theme}>
      <PaperProvider theme={Theme}>
        <View
          style={[
            styles.container,
            { backgroundColor: Theme.colors.background },
          ]}
        >
          <Appbar.Header elevated>
            <Appbar.Content title={'Dropdown Demo'} />
            <Appbar.Action
              icon={nightMode ? 'brightness-7' : 'brightness-3'}
              onPress={() => setNightmode(!nightMode)}
            />
          </Appbar.Header>
          <ScrollView
            showsVerticalScrollIndicator
            keyboardShouldPersistTaps={'handled'}
          >
            <View style={styles.formWrapper}>
              <Headline>Single Select</Headline>
              <View style={styles.spacer} />
              <Paragraph>Default Dropdown</Paragraph>
              <Dropdown
                label={'Gender'}
                placeholder="Select Gender"
                options={OPTIONS}
                value={gender}
                onSelect={setGender}
              />
              <View style={styles.spacer} />
              <Paragraph>Default Dropdown (Outline Mode)</Paragraph>
              <Dropdown
                label={'Gender'}
                placeholder="Select Gender"
                options={OPTIONS}
                value={gender}
                onSelect={setGender}
                mode="outlined"
              />
              <View style={styles.spacer} />
              <Paragraph>Custom Dropdown</Paragraph>
              <Dropdown
                label={'Gender'}
                placeholder="Select Gender"
                options={OPTIONS}
                value={gender}
                onSelect={setGender}
                menuContentStyle={{
                  backgroundColor: MD3DarkTheme.colors.onPrimary,
                }}
                menuUpIcon={
                  <TextInput.Icon
                    icon={'menu-up'}
                    color={MD3DarkTheme.colors.primaryContainer}
                    pointerEvents="none"
                  />
                }
                menuDownIcon={
                  <TextInput.Icon
                    icon={'menu-down'}
                    color={MD3DarkTheme.colors.primaryContainer}
                    pointerEvents="none"
                  />
                }
                CustomDropdownItem={({
                  width,
                  option,
                  value,
                  onSelect,
                  toggleMenu,
                  isLast,
                }) => {
                  return (
                    <>
                      <TouchableRipple
                        onPress={() => {
                          onSelect?.(option.value);
                          toggleMenu();
                        }}
                        style={{
                          height: 50,
                          width,
                          backgroundColor:
                            value === option.value
                              ? MD3DarkTheme.colors.primary
                              : MD3DarkTheme.colors.onPrimary,
                          justifyContent: 'center',
                          paddingHorizontal: 16,
                        }}
                      >
                        <Headline
                          style={{
                            color:
                              value === option.value
                                ? MD3DarkTheme.colors.onPrimary
                                : MD3DarkTheme.colors.primary,
                          }}
                        >
                          {option.label}
                        </Headline>
                      </TouchableRipple>
                      {!isLast && <Divider />}
                    </>
                  );
                }}
                CustomDropdownInput={({
                  placeholder,
                  selectedLabel,
                  rightIcon,
                }) => {
                  return (
                    <TextInput
                      mode="outlined"
                      placeholder={placeholder}
                      placeholderTextColor={MD3DarkTheme.colors.onSecondary}
                      value={selectedLabel}
                      style={{
                        backgroundColor: MD3DarkTheme.colors.primary,
                      }}
                      textColor={MD3DarkTheme.colors.onPrimary}
                      right={rightIcon}
                    />
                  );
                }}
              />

              <View style={styles.spacer} />
              <View style={styles.spacer} />

              <Headline>Multi Select</Headline>
              <View style={styles.spacer} />
              <Paragraph>Default Dropdown</Paragraph>
              <MultiSelectDropdown
                label={'Colors'}
                placeholder="Select Colors"
                options={MULTI_SELECT_OPTIONS}
                value={colors}
                onSelect={setColors}
              />
              <View style={styles.spacer} />
              <Paragraph>Default Dropdown (Outline Mode)</Paragraph>
              <MultiSelectDropdown
                label={'Colors'}
                placeholder="Select Colors"
                options={MULTI_SELECT_OPTIONS}
                value={colors}
                onSelect={setColors}
                mode={'outlined'}
              />
            </View>
          </ScrollView>
        </View>
      </PaperProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formWrapper: {
    margin: 16,
  },
  spacer: {
    height: 16,
  },
});
