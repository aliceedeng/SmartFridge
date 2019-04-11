"""
CLI interface for ingredient conversion step
"""
from Converter import Converter


def main():
    conv = Converter()
    conv.load()
    conv.convert()
    conv.save()
    print("DONE")


if __name__ == '__main__':
    main()
