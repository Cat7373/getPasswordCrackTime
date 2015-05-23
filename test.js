var test = getPasswordCrackTime(),

testPasswords = [
    '123456',
    'abcdef',
    'qwertyuiop',
    '1234567890',
    '!*&CG*#CGIUWGXSIC',
    'Aa1!.00000',
    'kkiiuujj',
    '!@#$%^&*()'
];

for(var id in testPasswords) {
    test.setPassword(testPasswords[id]);
    var score = test.getValue('time');

    console.log(testPasswords[id], score);
}

console.log("aabbccdd", test.getPasswordCrackTime("aabbccdd"));
