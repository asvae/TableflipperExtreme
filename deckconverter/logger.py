import logging

def set_logging_path(path):
    logging.basicConfig(filename=path, level=logging.DEBUG, filemode="w")

def info(msg, *args, **kwargs):
    logging.info(msg, *args, **kwargs)
    print("[INFO]: ", msg)

def warning(msg, *args, **kwargs):
    logging.warning(msg, *args, **kwargs)
    print("[WARNING]: ", msg)

def error(msg, *args, **kwargs):
    logging.error(msg, *args, **kwargs)
    print("[ERROR]: ", msg)

def critical(msg, *args, **kwargs):
    logging.critical(msg, *args, **kwargs)
    print("[CRITICAL]: ", msg)

__all__ = ['set_logging_path', 'info', 'warning', 'error', 'critical']