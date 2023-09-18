import { CHAPTER_LENGTH } from '@/constants'
import { currentChapterAtom, currentDictInfoAtom } from '@/store'
import type { WordWithIndex } from '@/typings/index'
import { wordListFetcher } from '@/utils/wordListFetcher'
import { useAtom, useAtomValue } from 'jotai'
import { useMemo } from 'react'
import useSWR from 'swr'

export type UseWordListResult = {
  words: WordWithIndex[] | undefined
  isLoading: boolean
  error: Error | undefined
}

/**
 * Use word lists from the current selected dictionary.
 */
export function useWordList(): UseWordListResult {
  const currentDictInfo = useAtomValue(currentDictInfoAtom)
  const [currentChapter, setCurrentChapter] = useAtom(currentChapterAtom)

  const isFirstChapter = currentDictInfo.id === 'cet4' && currentChapter === 0

  // Reset current chapter to 0, when currentChapter is greater than chapterCount.
  if (currentChapter >= currentDictInfo.chapterCount) {
    setCurrentChapter(0)
  }

  const { data: wordList, error, isLoading } = useSWR(currentDictInfo.url, wordListFetcher)

  const words: WordWithIndex[] = useMemo(() => {
    const newWords = isFirstChapter
      ? firstChapter
      : wordList
        ? wordList.slice(currentChapter * CHAPTER_LENGTH, (currentChapter + 1) * CHAPTER_LENGTH)
        : []

    // 记录原始 index
    return newWords.map((word, index) => ({ ...word, index }))
  }, [isFirstChapter, wordList, currentChapter])

  return { words: wordList === undefined ? undefined : words, isLoading, error }
}

const firstChapter = [
  {
    "name": "cancel",
    "trans": [
      "to decide that something that was officially planned will not happen"
    ],
    "usphone": "'kænsl",
    "ukphone": "'kænsl"
  },
  {
    "name": "explosive",
    "trans": [
      "able or likely to explode",
      "a substance that can cause an explosion"
    ],
    "usphone": "ɪk'splosɪv; ɪk'splozɪv",
    "ukphone": "ɪk'spləusɪv"
  },
  {
    "name": "numerous",
    "trans": [
      "many"
    ],
    "usphone": "'numərəs",
    "ukphone": "'njuːmərəs"
  },
  {
    "name": "govern",
    "trans": [
      null,
      "to officially and legally control a country and make all the decisions about taxes, laws, public services etc"
    ],
    "usphone": "'ɡʌvɚn",
    "ukphone": "'gʌvn"
  },
  {
    "name": "analyse",
    "trans": [
      "to examine or think about something carefully, in order to understand it"
    ],
    "usphone": "'æn(ə)laɪz",
    "ukphone": "'ænəlaɪz"
  },
  {
    "name": "discourage",
    "trans": [
      "to make someone less confident or less willing to do something"
    ],
    "usphone": "dɪs'kɝɪdʒ",
    "ukphone": "dɪs'kʌrɪdʒ"
  },
  {
    "name": "resemble",
    "trans": [
      "to look like or be similar to someone or something"
    ],
    "usphone": "rɪ'zɛmbl",
    "ukphone": "rɪ'zembl"
  },
  {
    "name": "remote",
    "trans": [
      "far from towns or other places where people live"
    ],
    "usphone": "rɪ'mot",
    "ukphone": "rɪ'məut"
  },
  {
    "name": "salary",
    "trans": [
      "money that you receive as payment from the organization you work for, usually paid to you every month"
    ],
    "usphone": "'sæləri",
    "ukphone": "'sæləri"
  },
  {
    "name": "pollution",
    "trans": [
      "the process of making air, water, soil etc dangerously dirty and not suitable for people to use, or the state of being dangerously dirty"
    ],
    "usphone": "pə'luʃən",
    "ukphone": "pə'luːʃn"
  },
  {
    "name": "pretend",
    "trans": [
      "to behave as if something is true when in fact you know it is not, in order to deceive people or for fun"
    ],
    "usphone": "prɪ'tɛnd",
    "ukphone": "prɪ'tend"
  },
  {
    "name": "kettle",
    "trans": [
      "a container with a lid, a handle, and a spout,used for boiling and pouring water"
    ],
    "usphone": "'kɛtl",
    "ukphone": "'ketl"
  },
  {
    "name": "wreck",
    "trans": [
      "a ship that has sunk",
      "to completely spoil something so that it cannot continue in a successful way"
    ],
    "usphone": "rɛk",
    "ukphone": "rek"
  },
  {
    "name": "drunk",
    "trans": [
      "unable to control your behaviour, speech etc because you have drunk too much alcohol"
    ],
    "usphone": "drʌŋk",
    "ukphone": "drʌŋk"
  },
  {
    "name": "calculate",
    "trans": [
      "to find out how much something will cost, how long something will take etc, by using numbers"
    ],
    "usphone": "'kælkjulet",
    "ukphone": "'kælkjuleɪt"
  },
  {
    "name": "persistent",
    "trans": [
      "continuing to exist or happen, especially for longer than is usual or desirable"
    ],
    "usphone": "pə'zɪstənt",
    "ukphone": "pə'sɪstənt"
  },
  {
    "name": "sake",
    "trans": [
      "in order to help, improve, or please someone or something"
    ],
    "usphone": "sek",
    "ukphone": "seɪk"
  },
  {
    "name": "conceal",
    "trans": [
      "to hide something carefully"
    ],
    "usphone": "kən'sil",
    "ukphone": "kən'siːl"
  },
  {
    "name": "audience",
    "trans": [
      "a group of people who come to watch and listen to someone speaking or performing in public"
    ],
    "usphone": "'ɔdɪəns",
    "ukphone": "'ɔːdiəns"
  },
  {
    "name": "meanwhile",
    "trans": [
      "while something else is happening"
    ],
    "usphone": "'minwaɪl",
    "ukphone": "'miːnwaɪl"
  }
]
