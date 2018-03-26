import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import ButtonToNextScene from '../components/ButtonToNextScene';

const styles = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 15,
    marginBottom: 7,
  },
  container: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});

const InformationSheet = ({ previousScene, nextScene, onPress }) => (
  <ScrollView style={styles.container}>
    <Text style={styles.header}>
      ONLINE PARTICIPANT INFORMATION SHEET (Experience Sampling Studies: Approach 3 Study 1B)
    </Text>
    <Text style={styles.title}>Study: An examination of technology and social behavior</Text>
    <Text style={styles.text}>
      The Synergy Lab at Yale-NUS would like to invite you to take part in our research study if you
      are above the age of 18 (NUS samples), above the age of 21 (all other samples), residents of
      the United States (for online studies using MTurk recruitment), Additionally, you need to have
      a smartphone and be agreeable to using it over the course of 1 week.
    </Text>
    <Text style={styles.text}>
      Before you decide, we would like you to understand why the research is being done and what it
      would involve for you. Please carefully go through the information sheet. Feel free to take as
      long as you need.
    </Text>
    <Text style={styles.text}>
      We are interested in understanding more about how cognitive processes vary in everyday
      contexts. When you sign up, you will be required to complete a set of online questionnaires
      (taking approximately 10 minutes). Additionally, we will contact you via your smartphone
      (through whatsapp, text messaging, or Facebook Messenger) 7 times a day for a week. Each time,
      we will require you to:
      {'\n    \u2022'} Answer questions, and
      {'\n    \u2022'} Complete computerized cognitive tasks.
    </Text>
    <Text style={styles.text}>Each phone contact will require {'<'}5 minutes of your time.</Text>
    <Text style={styles.text}>
      We take your privacy very seriously and thus have built in several safeguards to make sure
      your data stays safe. The only personal identifiers we will collect (e.g., phone number or
      email address) will be used to contact you during the week. This will be discarded once the
      study is over and you have been reimbursed. We will store your data in an anonymized manner.
      All of our data is saved on a private, secure server. No one has access to the server except
      the research team and our collaborators; your data will only be used for research purposes.
    </Text>
    <Text style={styles.text}>
      There are no anticipated discomforts or risk. We cannot promise the study will benefit you but
      the information we get from this study will help answer important research questions about
      cognitive processes in everyday settings. You will also be reimbursed USD $5 / SGD $10 for
      your time if you respond to at least 80% of the pings. Alternatively, if you are completing
      this for course credit, participation in this study will give you 2 hours worth of credit
      (again provided you respond to at least 80% of the pings).
    </Text>
    <Text style={styles.text}>
      Your participation in this study is voluntary, and you are free to withdraw your consent and
      discontinue participation at any time by closing the browser or by informing the researcher.
      Please note that you can only complete each phone session once and cannot return to it once
      started, so please allow enough time (approximately 5 minutes) to fully complete it. If you
      participate throughout the study, you may refuse to answer any question(s) or request(s) that
      might make you feel uncomfortable. All the information which we obtain from you will be kept
      confidential.
    </Text>
    <Text style={styles.text}>
      The project has received ethical approval from the Institutional Review Board of the National
      University of Singapore. If you have any concerns or questions about any aspect of this study,
      you may email Dr Jean Liu at jeanliu@yale-nus.edu.sg. For an independent opinion regarding the
      research and the rights of research participants, you may contact a staff member of the
      National University of Singapore Institutional Review Board (Attn: Dr Chan Tuck Wai, at
      telephone +65-6516 1234 or email irb@nus.edu.sg).
    </Text>
    <ButtonToNextScene previousScene={previousScene} nextScene={nextScene} onPress={onPress} />
  </ScrollView>
);

export default InformationSheet;
