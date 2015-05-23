/**
 * 测试密码安全性的类
 */
function getPasswordCrackTime() {
    /* 公开函数 */
    var publicMethods = {},
        /* 字符匹配列表 */
        matches = (function() {
            var matches = [],

                add = function(name, match, length) {
                    matches.push({name: name, match: match, length: length});
                };

            /* ASCII字符 */
            add('ASCII Lowercase', /[a-z]/, 26);
            add('ASCII Uppercase', /[A-Z]/, 26);
            add('ASCII Numbers', /\d/, 10);
            add('ASCII Top Row Symbols', /[!@#\$%\^&\*\(\)\-_=\+]/, 14);
            add('ASCII Other Symbols', /[\?\/\.>\,<`~\\|"';:\]\}\[\{\s]/, 19); /*"*/

            return matches;
        }()),
        /* 存储的属性 */
        values = {
            time: 0,             /* 破解所需时间 */
            calcs: 400000000,    /* 每秒计算能力 */
            characters: 0,       /* 爆破需要使用的字符数 */
            combinations: 0,     /* 爆破需要测试的组合数 */
            characterSets: [],   /* 密码使用的字符类型的名称列表 */
            length: 0,           /* 密码的长度 */
            password: ''         /* 当前使用的密码 */
        },

        /* private Methods */
        /* 计算爆破所需的组合数 */
        combinations = function () {
            values.length = values.password.length;

            if (values.length) {
                values.combinations = Math.pow(values.characters, values.length);
            } else {
                values.combinations = 0;
            }
        },

        /* 计算爆破字符数、字符类型 */
        characters = function () {

            var i,
                len = matches.length;

            values.characterSets = [];
            values.characters = 0;

            for (i = 0; i < len; i += 1) {
                if (values.password.match(matches[i].match)) {
                    values.characters += matches[i].length;
                    values.characterSets.push(matches[i].name);
                }
            }
        },

        /* 计算爆破所需的时间 */
        time = function () {
            combinations();
            values.time = values.combinations / values.calcs;
        };

    /* Public Methods */

    /* Set methods */
    /**
     * 设置要评估的密码
     * @param password 要设置的密码
     */
    publicMethods.setPassword = function(password) {
        values.password = password;

        characters();
        time();
    }
    /**
     * 设置每秒计算能力
     * @param calcs 要设置的数值，默认值为400000000
     */
    publicMethods.setCalcs = function(calcs) {
        if (!c) {
            c = 1;
        }

        values.calcs = calcs;
        time();
    }

    /* Get methods */
    /**
     * 获取某个属性的值
     * @param name 要获取值的属性名称
     */
    publicMethods.getValue = function(name) {
        return values[name];
    }

    /**
     * 评估一个密码的爆破所需的时间
     * 本函数相当于先setPassword然后getValue
     * @param password 要评估的密码
     * @return 爆破该密码所需的时间
     */
    publicMethods.getPasswordCrackTime = function(password) {
    	publicMethods.setPassword(password);
    	return publicMethods.getValue('time');
    }

    return publicMethods;
}
