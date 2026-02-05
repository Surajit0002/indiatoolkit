"use client";

import { useState } from "react";
import { Copy, Check, Type, RefreshCw, Globe, Sparkles } from "lucide-react";

type UnicodeStyle = 'bubble' | 'bold' | 'script' | 'gothic' | 'double' | 'wide' | 'small' | 'upside' | 'reverse' | 'zirak';

interface UnicodePreset {
  id: UnicodeStyle;
  label: string;
  icon: string;
  description: string;
  transform: (text: string) => string;
}

const unicodePresets: UnicodePreset[] = [
  {
    id: 'bubble',
    label: 'Bubble',
    icon: '🫧',
    description: 'Surrounded circles',
    transform: (text: string) => {
      const map: Record<string, string> = {
        'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ',
        'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ',
        'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ',
        'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ',
        'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ',
        'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ',
        '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨',
      };
      return text.split('').map(c => map[c] || c).join('');
    }
  },
  {
    id: 'bold',
    label: 'Bold',
    icon: '𝐁',
    description: 'Mathematical bold',
    transform: (text: string) => {
      const map: Record<string, string> = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉',
        'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓',
        'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
        'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣',
        'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭',
        'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳',
        '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗',
      };
      return text.split('').map(c => map[c] || c).join('');
    }
  },
  {
    id: 'script',
    label: 'Script',
    icon: '𝒮',
    description: 'Cursive style',
    transform: (text: string) => {
      const map: Record<string, string> = {
        'A': '𝒜', 'B': '𝐵', 'C': '𝒞', 'D': '𝒟', 'E': '𝐸', 'F': '𝒢', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼', 'J': '𝒥',
        'K': '𝒦', 'L': '𝐿', 'M': '𝑀', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': '𝑅', 'S': '𝒮', 'T': '𝒯',
        'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵',
        'a': '𝒶', 'b': '𝒷', 'c': '𝒸', 'd': '𝒹', 'e': '𝑒', 'f': '𝒻', 'g': '𝑔', 'h': '𝒽', 'i': '𝒾', 'j': '𝒿',
        'k': '𝓀', 'l': '𝓁', 'm': '𝓂', 'n': '𝓃', 'o': '𝓅', 'p': '𝓆', 'q': '𝓇', 'r': '𝓈', 's': '𝓉', 't': '𝓉',
        'u': '𝓊', 'v': '𝓋', 'w': '𝓌', 'x': '𝓍', 'y': '𝓎', 'z': '𝓏',
      };
      return text.split('').map(c => map[c] || c).join('');
    }
  },
  {
    id: 'gothic',
    label: 'Gothic',
    icon: '𝔊',
    description: 'Blackletter style',
    transform: (text: string) => {
      const map: Record<string, string> = {
        'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ', 'I': 'ℑ', 'J': '𝔍',
        'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑', 'O': '𝔒', 'P': '𝔓', 'Q': '𝔔', 'R': 'ℜ', 'S': '𝔖', 'T': '𝔗',
        'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛', 'Y': '𝔜', 'Z': 'ℨ',
        'a': '𝔞', 'b': '𝔟', 'c': '𝔠', 'd': '𝔡', 'e': '𝔢', 'f': '𝔣', 'g': '𝔤', 'h': '𝔥', 'i': '𝔦', 'j': '𝔧',
        'k': '𝔨', 'l': '𝔩', 'm': '𝔪', 'n': '𝔫', 'o': '𝔬', 'p': '𝔭', 'q': '𝔮', 'r': '𝔯', 's': '𝔰', 't': '𝔱',
        'u': '𝔲', 'v': '𝔳', 'w': '𝔴', 'x': '𝔵', 'y': '𝔶', 'z': '𝔷',
      };
      return text.split('').map(c => map[c] || c).join('');
    }
  },
  {
    id: 'double',
    label: 'Double',
    icon: '𝔻',
    description: 'Double struck',
    transform: (text: string) => {
      const map: Record<string, string> = {
        'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁',
        'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋',
        'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ',
        'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙', 'i': '𝕚', 'j': '𝕛',
        'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡', 'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥',
        'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩', 'y': '𝕪', 'z': '𝕫',
        '0': '𝟘', '1': '𝟙', '2': '𝟚', '3': '𝟛', '4': '𝟜', '5': '𝟝', '6': '𝟞', '7': '𝟟', '8': '𝟠', '9': '𝟡',
      };
      return text.split('').map(c => map[c] || c).join('');
    }
  },
  {
    id: 'wide',
    label: 'Wide',
    icon: 'Ｗ',
    description: 'Full width',
    transform: (text: string) => {
      const map: Record<string, string> = {
        'A': 'Ａ', 'B': 'Ｂ', 'C': 'Ｃ', 'D': 'Ｄ', 'E': 'Ｅ', 'F': 'Ｆ', 'G': 'Ｇ', 'H': 'Ｈ', 'I': 'Ｉ', 'J': 'Ｊ',
        'K': 'Ｋ', 'L': 'Ｌ', 'M': 'Ｍ', 'N': 'Ｎ', 'O': 'Ｏ', 'P': 'Ｐ', 'Q': 'Ｑ', 'R': 'Ｒ', 'S': 'Ｓ', 'T': 'Ｔ',
        'U': 'Ｕ', 'V': 'Ｖ', 'W': 'Ｗ', 'X': 'Ｘ', 'Y': 'Ｙ', 'Z': 'Ｚ',
        'a': 'ａ', 'b': 'ｂ', 'c': 'ｃ', 'd': 'ｄ', 'e': 'ｅ', 'f': 'ｆ', 'g': 'ｇ', 'h': 'ｈ', 'i': 'ｉ', 'j': 'ｊ',
        'k': 'ｋ', 'l': '	l', 'm': 'ｍ', 'n': 'ｎ', 'o': 'ｏ', 'p': 'ｐ', 'q': 'ｑ', 'r': 'ｒ', 's': 'ｓ', 't': '	t',
        'u': '	u', 'v': 'ｖ', 'w': 'ｗ', 'x': '	x', 'y': '	y', 'z': '	z',
        '0': '０', '1': '１', '2': '２', '3': '３', '4': '４', '5': '５', '6': '６', '7': '７', '8': '８', '9': '９',
      };
      return text.split('').map(c => map[c] || c).join('');
    }
  },
  {
    id: 'small',
    label: 'Small',
    icon: 'ˢ',
    description: 'Small caps',
    transform: (text: string) => {
      const map: Record<string, string> = {
        'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ꜰ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ', 'J': 'ᴊ',
        'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ', 'S': 's', 'T': 'ᴛ',
        'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ',
      };
      return text.split('').map(c => map[c] || c).join('');
    }
  },
  {
    id: 'upside',
    label: 'Upside',
    icon: '∩',
    description: 'Upside down',
    transform: (text: string) => {
      const map: Record<string, string> = {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'b', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ',
        'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ',
        'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
        'A': '∀', 'B': '𐐒', 'C': 'Ɔ', 'D': 'p', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ',
        'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'd', 'Q': 'Q', 'R': 'R', 'S': 'S', 'T': '┴',
        'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z',
        '0': '0', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6',
        '.': '˙', ',': '\'', '?': '¿', '!': '¡', '"': ',,', '\'': ',', '`': '	', '^': 'v', '_': '¯',
        '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<',
      };
      return text.split('').map(c => map[c] || c).join('').split('').reverse().join('');
    }
  },
  {
    id: 'reverse',
    label: 'Reverse',
    icon: 'Ↄ',
    description: 'Reversed text',
    transform: (text: string) => text.split('').reverse().join(''),
  },
  {
    id: 'zirak',
    label: 'Zalgo',
    icon: 'Ẕ',
    description: 'Glitch style',
    transform: (text: string) => {
      const zalgoChars = ['̀', '́', '̂', '̃', '̄', '̅', '̆', '̇', '̈', '̉', '̊', '̋', '̌', '̎', '̐', '̒', '̓', '̔', '̕', '̖', '̗', '̘', '̙', '̚', '̛', '̜', '̝', '̞', '̟', '̠', '̡', '̢', '̣', '̤', '̥', '̦', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰', '̱', '̲', '̳', '̴', '̵', '̶', '̷', '̸', '̹', '̺', '̻', '̼', 'ͅ', '͇', '͈', '͉', '͍', '͎', '͐', '͑', '͒', '͓', '͔', '͕', '͖', '͗', '͙', '͚', '͛', '͜', '͝', '͞', '͟', '͠', '͡', '͢', 'ͣ', 'ͤ', 'ͥ', 'ͦ', 'ͧ', 'ͨ', 'ͩ', 'ͪ', 'ͫ', 'ͬ', 'ͭ', 'ͮ', 'ͯ', '̾', 'Ϳ', '΀', '΁', '΂', '΃', '΄', '΅', 'Ά', '·', 'Έ', 'Ή', 'Ί', '΋', 'Ό', '΍', 'Ύ', 'Ώ', 'ΐ', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', '΢', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω', 'Ϊ', 'Ϋ', 'ά', 'έ', 'ή', 'ί', 'ΰ', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'ς', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω', 'ϊ', 'ϋ', 'ό', 'ύ', 'ώ', 'Ϗ', 'ϐ', 'ϑ', 'ϒ', 'ϓ', 'ϔ', 'ϕ', 'ϖ', 'ϗ', 'Ϙ', 'ϙ', 'Ϛ', 'ϛ', 'Ϝ', 'ϝ', 'Ϟ', 'ϟ', 'Ϡ', 'ϡ', 'Ϣ', 'ϣ', 'Ϥ', 'ϥ', 'Ϧ', 'ϧ', 'Ϩ', 'ϩ', 'Ϫ', 'ϫ', 'Ϭ', 'ϭ', 'Ϯ', 'ϯ', 'ϰ', 'ϱ', 'ϲ', 'ϳ', 'ϴ', 'ϵ', '϶', 'Ϸ', 'ϸ', 'Ϲ', 'Ϻ', 'ϻ', 'ϼ', 'Ͻ', 'Ͼ', 'Ͽ', 'Ѐ', 'Ё', 'Ђ', 'Ѓ', 'Є', 'Ѕ', 'І', 'Ї', 'Ј', 'Љ', 'Њ', 'Ћ', 'Ќ', 'Ѝ', 'Ў', 'Џ', 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я', 'ѐ', 'ё', 'ђ', 'ѓ', 'є', 'ѕ', 'і', 'ї', 'ј', 'љ', 'њ', 'ћ', 'ќ', 'ѝ', 'ћ', 'ѡ', 'ѣ', 'ѥ', 'Ѧ', 'ѧ', 'Ѩ', 'ѩ', 'Ѫ', 'ѫ', 'Ѭ', 'ѭ', 'Ѯ', 'ѯ', 'Ѱ', 'ѱ', 'Ѳ', 'ѳ', 'Ѵ', 'ѵ', 'Ѷ', 'ѷ', 'Ѹ', 'ѹ', 'Ѻ', 'ѻ', 'Ѽ', 'ѽ', 'Ѿ', 'ѿ', 'Ҁ', 'ҁ', '҂', '҃', '҄', '҅', '҆', '҇', '҈', '҉', 'Ҋ', 'ҋ', 'Ҍ', 'ҍ', '�', 'ҏ', 'Ґ', 'ґ', 'Ғ', 'ғ', 'Ҕ', 'ҕ', 'Җ', 'җ', 'Ҙ', 'ҙ', 'Қ', 'қ', 'Ҝ', 'ҝ', 'Ҟ', 'ҟ', 'Ҡ', 'ҡ', 'Ң', 'ң', 'Ҥ', 'ҥ', 'Ҧ', 'ҧ', 'Ҩ', 'ҩ', 'Ҫ', 'ҫ', 'Ҭ', 'ҭ', 'Ү', 'ү', 'Ұ', 'ұ', 'Ҳ', 'ҳ', 'Ҵ', 'ҵ', 'Ҷ', 'ҷ', 'Ҹ', 'ҹ', 'Һ', 'һ', 'Ҽ', 'ҽ', 'Ҿ', 'ҿ', 'Ӏ', 'Ӂ', 'ӂ', 'Ӄ', 'ӄ', 'Ӆ', 'ӆ', 'Ӈ', 'ӈ', 'Ӊ', 'ӊ', 'Ӌ', 'ӌ', 'Ӎ', 'ӎ', 'ӏ', 'Ӑ', 'ӑ', 'Ӓ', 'ӓ', 'Ӕ', 'ӕ', 'Ӗ', 'ӗ', 'Ә', 'ә', 'Ӛ', 'ӛ', 'Ӝ', 'ӝ', 'Ӟ', 'ӟ', 'Ӡ', 'ӡ', 'Ӣ', 'ӣ', 'Ӥ', 'ӥ', 'Ӧ', 'ӧ', 'Ө', 'ө', 'Ӫ', 'ӫ', 'Ӭ', 'ӭ', 'Ӯ', 'ӯ', 'Ӱ', 'ӱ', 'Ӳ', 'ӳ', 'Ӵ', 'ӵ', 'Ӷ', 'ӷ', 'Ӹ', 'ӹ', 'Ӻ', 'ӻ', 'Ӽ', 'ӽ', 'Ӿ', 'ӿ', 'Ԁ', 'ԁ', 'Ԃ', 'ԃ', 'Ԅ', 'ԅ', 'Ԇ', 'ԇ', 'Ԉ', 'ԉ', 'Ԋ', 'ԋ', 'Ԍ', 'ԍ', 'Ԏ', 'ԏ', 'Ԑ', 'ԑ', 'Ԓ', 'ԓ', 'Ԕ', 'ԕ', 'Ԗ', 'ԗ', 'Ԙ', 'ԙ', 'Ԛ', 'ԛ', 'Ԝ', 'ԝ', 'Ԟ', 'ԟ', 'Ԡ', 'ԡ', 'Ԣ', 'ԣ', 'Ԥ', 'ԥ', 'Ԧ', 'ԧ', 'Ԩ', 'ԩ', 'Ԫ', 'ԫ', 'Ԭ', 'ԭ', 'Ԯ', 'ԯ', '԰', 'Ա', 'Բ', 'Գ', 'Դ', 'Ե', 'Զ', 'Է', 'Ը', 'Թ', 'Ժ', 'Ի', 'Լ', 'Խ', 'Ծ', 'Կ', 'Հ', 'Ձ', 'Ղ', 'Ճ', 'Մ', 'Յ', 'Ն', 'Շ', 'Ո', 'Չ', 'Պ', 'Ջ', 'Ռ', 'Ս', 'Վ', 'Տ', 'Ր', 'Ց', 'Ւ', 'Փ', 'Ք', 'Օ', 'Ֆ', 'ՙ', '՚', '՛', '՜', '՝', '՞', '՟', 'ՠ', 'ա', 'բ', 'գ', 'դ', 'ե', 'զ', 'է', 'ը', 'թ', 'ժ', 'ի', 'լ', 'խ', 'ծ', 'կ', 'հ', 'ձ', 'ղ', 'ճ', 'մ', 'յ', 'ն', 'շ', 'ո', 'չ', 'պ', 'ջ', 'ռ', 'ս', 'վ', 'տ', 'ր', 'ց', 'ւ', 'փ', 'ք', 'օ', 'ֆ', 'և', 'ֈ', '։', '֊', '֋', '֌', '֍', '֎', '֏', '֐', '֑', '֒', '֓', '֔', '֕', '֖', '֗', '֘', '֙', '֚', '֛', '֜', '֝', '֞', '֟', '֠', '֡', '֢', '֣', '֤', '֥', '֦', '֧', '֨', '֩', '֪', '֫', '֬', '֭', '֮', '֯', 'ְ', 'ֱ', 'ֲ', 'ֳ', 'ִ', 'ֵ', 'ֶ', 'ַ', 'ָ', 'ֹ', 'ּ', 'ֻ', 'ּ', 'ֽ', '־', 'ֿ', '׀', 'ׁ', 'ׂ', '׃', 'ׄ', 'ׅ', '׆', 'ׇ', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'ך', 'כ', 'ל', 'ם', 'מ', 'ן', 'נ', 'ס', 'ע', 'ף', 'פ', 'ץ', 'צ', 'ק', 'ר', 'ש', 'ת', 'ׯ', 'װ', 'ױ', 'ײ', '׳', '״', 'שׂ', 'שּ', 'שּׁ', 'שּׂ', 'אַ', 'אָ', 'אּ', 'בּ', 'גּ', 'דּ', 'הּ', 'וּ', 'זּ', 'חּ', 'טּ', 'יּ', 'כּ', 'לּ', 'מּ', 'נּ', 'סּ', 'עּ', 'פּ', 'צּ', 'קּ', 'רּ', 'שּ', 'תּ', 'וֹ', 'בֽ', '׃', '׆'];
      return text.split('').map(char => {
        const intensity = Math.floor(Math.random() * 5);
        let result = char;
        for (let i = 0; i < intensity; i++) {
          result += zalgoChars[Math.floor(Math.random() * zalgoChars.length)];
        }
        return result;
      }).join('');
    }
  },
];

export default function UnicodeTextConverter() {
  const [text, setText] = useState("Unicode Text Converter");
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState<UnicodeStyle>('bubble');

  const handleCopy = () => {
    const result = unicodePresets.find(p => p.id === activePreset)?.transform(text) || text;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const result = unicodePresets.find(p => p.id === activePreset)?.transform(text) || text;

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-indigo-200">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Unicode Text Converter</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Creative Characters</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Input Text</label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Live</span>
                </div>
              </div>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert..."
                className="relative w-full h-32 p-6 bg-slate-50/50 border border-slate-100 rounded-[32px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-700 resize-none text-lg leading-relaxed shadow-inner placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Output</label>
                <span className="text-[9px] font-black text-indigo-600 uppercase">{unicodePresets.find(p => p.id === activePreset)?.label}</span>
              </div>
              
              <div className="relative h-32 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-[32px] overflow-auto">
                <p className="text-lg font-bold break-words">{result}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Unicode Styles</label>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">10 Options</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {unicodePresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setActivePreset(preset.id)}
                  className={`h-20 rounded-xl p-3 transition-all text-left ${
                    activePreset === preset.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                      : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{preset.icon}</span>
                    <span className="text-xs font-black uppercase tracking-wider">{preset.label}</span>
                  </div>
                  <p className="text-[9px] opacity-75">{preset.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-50">
            <button
              onClick={handleCopy}
              className="flex-1 h-16 bg-slate-900 text-white rounded-[24px] hover:bg-indigo-600 transition-all font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
              {copied ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
              {copied ? "COPIED TO CLIPBOARD" : "COPY RESULT"}
            </button>
            <button
              onClick={() => setText("Unicode Text Converter")}
              className="h-16 px-8 bg-slate-100 text-slate-400 rounded-[24px] hover:bg-red-50 hover:text-red-600 transition-all shadow-sm active:scale-95"
            >
              <RefreshCw className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
