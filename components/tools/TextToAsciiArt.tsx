"use client";

import { useState } from "react";
import { Copy, Check, Type, RefreshCw, Terminal, Code, Sliders } from "lucide-react";

type AsciiStyle = 'standard' | 'big' | 'small' | 'block' | 'rounded' | 'slant' | 'script' | 'doom';

interface AsciiPreset {
  id: AsciiStyle;
  label: string;
  description: string;
  chars: string;
}

const asciiPresets: AsciiPreset[] = [
  { id: 'standard', label: 'Standard', description: 'Basic ASCII', chars: ' .:-=+*#%@' },
  { id: 'big', label: 'Big', description: 'Large block characters', chars: ' ░▒▓█' },
  { id: 'small', label: 'Small', description: 'Fine details', chars: ' .,:;i1tfLCG08@' },
  { id: 'block', label: 'Block', description: 'Solid blocks', chars: ' ▖▗▘▙▚▛▜▝▞▟' },
  { id: 'rounded', label: 'Rounded', description: 'Smooth edges', chars: ' ⡀⡄⡆⡇⡉⡋⡍⡎⡏⡑⡒⡓⡔⡕' },
  { id: 'slant', label: 'Slant', description: 'Diagonal shading', chars: ' /-^`\\' },
  { id: 'script', label: 'Script', description: 'Handwritten style', chars: ' .\'`^",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$' },
  { id: 'doom', label: 'Doom', description: 'Gaming style', chars: ' ░▒▓█' },
];

// Simplified text to ASCII art conversion
const textToAscii = (text: string, style: AsciiStyle): string => {
  const chars = asciiPresets.find(p => p.id === style)?.chars || ' .:-=+*#%@';
  
  // Simple mapping for demonstration
  const letterPatterns: Record<string, string[]> = {
    'A': [
      '  A  ',
      ' A A ',
      'AAAAA',
      'A   A',
      'A   A',
    ],
    'B': [
      'BBBB ',
      'B   B',
      'BBBB ',
      'B   B',
      'BBBB ',
    ],
    'C': [
      ' CCC ',
      'C   C',
      'C    ',
      'C   C',
      ' CCC ',
    ],
    'D': [
      'DDDD ',
      'D   D',
      'D   D',
      'D   D',
      'DDDD ',
    ],
    'E': [
      'EEEEE',
      'E    ',
      'EEE  ',
      'E    ',
      'EEEEE',
    ],
    'F': [
      'FFFFF',
      'F    ',
      'FFF  ',
      'F    ',
      'F    ',
    ],
    'G': [
      ' GGG ',
      'G    ',
      'G  GG',
      'G   G',
      ' GGG ',
    ],
    'H': [
      'H   H',
      'H   H',
      'HHHHH',
      'H   H',
      'H   H',
    ],
    'I': [
      'IIIII',
      '  I  ',
      '  I  ',
      '  I  ',
      'IIIII',
    ],
    'J': [
      'JJJJJ',
      '   J ',
      '   J ',
      'J  J ',
      ' JJ  ',
    ],
    'K': [
      'K   K',
      'K  K ',
      'KKK  ',
      'K  K ',
      'K   K',
    ],
    'L': [
      'L    ',
      'L    ',
      'L    ',
      'L    ',
      'LLLLL',
    ],
    'M': [
      'M   M',
      'MM MM',
      'M M M',
      'M   M',
      'M   M',
    ],
    'N': [
      'N   N',
      'NN  N',
      'N N N',
      'N  NN',
      'N   N',
    ],
    'O': [
      ' OOO ',
      'O   O',
      'O   O',
      'O   O',
      ' OOO ',
    ],
    'P': [
      'PPPP ',
      'P   P',
      'PPPP ',
      'P    ',
      'P    ',
    ],
    'Q': [
      ' QQQ ',
      'Q   Q',
      'Q   Q',
      'Q  Q ',
      ' QQ Q',
    ],
    'R': [
      'RRRR ',
      'R   R',
      'RRRR ',
      'R  R ',
      'R   R',
    ],
    'S': [
      'SSSSS',
      'S    ',
      ' SSS ',
      '    S',
      'SSSSS',
    ],
    'T': [
      'TTTTT',
      '  T  ',
      '  T  ',
      '  T  ',
      '  T  ',
    ],
    'U': [
      'U   U',
      'U   U',
      'U   U',
      'U   U',
      ' UUU ',
    ],
    'V': [
      'V   V',
      'V   V',
      'V   V',
      ' V V ',
      '  V  ',
    ],
    'W': [
      'W   W',
      'W   W',
      'W W W',
      'WW WW',
      'W   W',
    ],
    'X': [
      'X   X',
      ' X X ',
      '  X  ',
      ' X X ',
      'X   X',
    ],
    'Y': [
      'Y   Y',
      ' Y Y ',
      '  Y  ',
      '  Y  ',
      '  Y  ',
    ],
    'Z': [
      'ZZZZZ',
      '   Z ',
      '  Z  ',
      ' Z   ',
      'ZZZZZ',
    ],
    '0': [
      ' 00  ',
      '0  0 ',
      '0  0 ',
      '0  0 ',
      ' 00  ',
    ],
    '1': [
      ' 1   ',
      '11   ',
      ' 1   ',
      ' 1   ',
      '11111',
    ],
    '2': [
      ' 222 ',
      '2   2',
      '   2 ',
      '  2  ',
      '22222',
    ],
    '3': [
      '3333 ',
      '    3',
      '  33 ',
      '    3',
      '3333 ',
    ],
    '4': [
      '4   4',
      '4   4',
      '44444',
      '    4',
      '    4',
    ],
    '5': [
      '55555',
      '5    ',
      '5555 ',
      '    5',
      '5555 ',
    ],
    '6': [
      ' 666 ',
      '6    ',
      '6666 ',
      '6   6',
      ' 666 ',
    ],
    '7': [
      '77777',
      '    7',
      '   7 ',
      '  7  ',
      ' 7   ',
    ],
    '8': [
      ' 888 ',
      '8   8',
      ' 888 ',
      '8   8',
      ' 888 ',
    ],
    '9': [
      ' 999 ',
      '9   9',
      ' 9999',
      '    9',
      ' 99  ',
    ],
    ' ': [
      '     ',
      '     ',
      '     ',
      '     ',
      '     ',
    ],
    '!': [
      ' !   ',
      ' !   ',
      ' !   ',
      '     ',
      ' !   ',
    ],
    '.': [
      '     ',
      '     ',
      '     ',
      '     ',
      ' .   ',
    ],
    ',': [
      '     ',
      '     ',
      '     ',
      ' ,   ',
      ' ,   ',
    ],
  };

  const words = text.split(' ');
  const result: string[] = Array(5).fill('');

  words.forEach((word, wordIndex) => {
    const chars = word.split('');
    for (let line = 0; line < 5; line++) {
      let lineContent = '';
      chars.forEach(char => {
        const pattern = letterPatterns[char.toUpperCase()] || letterPatterns[' '];
        lineContent += pattern[line] + ' ';
      });
      result[line] += lineContent;
    }
    if (wordIndex < words.length - 1) {
      for (let line = 0; line < 5; line++) {
        result[line] += '  ';
      }
    }
  });

  return result.join('\n');
};

export default function TextToAsciiArt() {
  const [text, setText] = useState("ASCII");
  const [style, setStyle] = useState<AsciiStyle>('standard');
  const [copied, setCopied] = useState(false);
  const [copiedRaw, setCopiedRaw] = useState(false);

  const asciiArt = useMemo(() => textToAscii(text, style), [text, style]);

  const handleCopy = (type: string) => {
    if (type === 'art') {
      navigator.clipboard.writeText(asciiArt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      navigator.clipboard.writeText(text);
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-slate-300">
                <Terminal className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Text to ASCII Art</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Character Art</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Input Text</label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Letters</span>
                </div>
              </div>
              
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, ''))}
                placeholder="Enter text..."
                className="relative w-full h-14 px-6 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-slate-500/10 transition-all font-bold text-slate-700 shadow-inner placeholder:text-slate-300 text-center tracking-[0.5em]"
                maxLength={10}
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Style</label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-slate-600"></div>
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">8 Options</span>
                </div>
              </div>
              
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as AsciiStyle)}
                className="w-full h-14 px-6 bg-slate-50/50 border border-slate-100 rounded-[24px] focus:outline-none focus:bg-white focus:ring-4 focus:ring-slate-500/10 transition-all font-bold text-slate-700 shadow-inner"
              >
                {asciiPresets.map((preset) => (
                  <option key={preset.id} value={preset.id}>{preset.label} - {preset.description}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ASCII Art Preview</label>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-slate-300" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Monospace</span>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-[24px] p-8 overflow-x-auto border border-slate-700">
              <pre className="text-emerald-400 font-mono text-sm leading-none whitespace-pre">
                {asciiArt}
              </pre>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Character Set</label>
            </div>
            
            <div className="bg-slate-50 rounded-[24px] p-6 border border-slate-100">
              <div className="text-center">
                <span className="text-2xl font-black text-slate-700 tracking-widest">
                  {asciiPresets.find(p => p.id === style)?.chars}
                </span>
              </div>
              <div className="text-center mt-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Density: {asciiPresets.find(p => p.id === style)?.description}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-50">
            <button
              onClick={() => handleCopy('art')}
              className="flex-1 h-16 bg-slate-900 text-white rounded-[24px] hover:bg-emerald-600 transition-all font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
              {copied ? <Check className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
              {copied ? "ART COPIED!" : "COPY ASCII ART"}
            </button>
            <button
              onClick={() => handleCopy('raw')}
              className="h-16 px-8 bg-slate-100 text-slate-700 rounded-[24px] hover:bg-slate-200 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-3 font-black uppercase tracking-widest"
            >
              <Code className="h-6 w-6" />
              COPY TEXT
            </button>
            <button
              onClick={() => setText("ASCII")}
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
